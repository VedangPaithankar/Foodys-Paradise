package com.vedang.foodysparadise.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedang.foodysparadise.dto.RecommendRequest;
import com.vedang.foodysparadise.dto.RecommendResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

// Talks to the ml-service/ FastAPI microservice. Deliberately dumb: this
// class knows nothing about recipes beyond ids/scores -- ranking is the ML
// service's job, hydrating those ids into full recipe data is the caller's
// (RecipeService), which is the service-boundary story this split exists for.
//
// Uses the JDK's own HttpClient + a plain `new ObjectMapper()`, rather than
// Spring's RestClient: on this Spring Boot 4.1.0 build, RestClient silently
// sent an empty body no matter how it was constructed (static factory,
// injected autoconfigured Builder -- both produced the exact same
// "body: Field required" 422 from FastAPI). Boot 4.1 also doesn't register a
// classic com.fasterxml.jackson.databind.ObjectMapper bean at all (its own
// JSON stack has moved on), so this instantiates one directly rather than
// relying on Spring DI to find one -- this class's use of it is entirely
// self-contained and needs no app-wide Jackson configuration anyway.
@Component
public class MlRecommendationClient {

    // HTTP/1.1 explicitly: HttpClient defaults to attempting HTTP/2, and
    // uvicorn (the ML service's server) only speaks HTTP/1.1 -- that
    // negotiation was the actual cause of every "body: Field required" 422
    // seen while chasing this (confirmed by wget, from inside this same
    // container, sending the identical payload successfully over HTTP/1.1).
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(5))
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String baseUrl;

    public MlRecommendationClient(@Value("${ml.service.base-url}") String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public List<RecommendResponse.RecommendedRecipe> recommend(List<String> ingredients, int limit) {
        try {
            String requestBody = objectMapper.writeValueAsString(new RecommendRequest(ingredients, limit));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + "/recommend"))
                    .header("Content-Type", "application/json")
                    .timeout(Duration.ofSeconds(10))
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new IllegalStateException(
                        "ML service returned " + response.statusCode() + ": " + response.body());
            }

            RecommendResponse parsed = objectMapper.readValue(response.body(), RecommendResponse.class);
            return parsed.results();
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            throw new IllegalStateException("Failed to call the ML recommender service", e);
        }
    }
}
