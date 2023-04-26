# Use the official Keycloak base image
FROM jboss/keycloak

# Set environment variables for Keycloak
ENV KEYCLOAK_USER=admin
ENV KEYCLOAK_PASSWORD=admin
ENV DB_VENDOR=h2
ENV DB_ADDR=localhost
ENV DB_PORT=5432
ENV DB_USER=keycloak
ENV DB_PASSWORD=keycloak
ENV DB_DATABASE=keycloak
ENV PROXY_ADDRESS_FORWARDING=true

# Copy custom login themes (if any)
COPY ./themes /opt/jboss/keycloak/themes

# Copy import files (if any)
COPY ./imports /opt/jboss/keycloak/standalone/import

# Expose ports for Keycloak
EXPOSE 8080
EXPOSE 8443

# Start Keycloak
CMD ["-b", "0.0.0.0"]
ENTRYPOINT ["/opt/jboss/keycloak/bin/standalone.sh"]