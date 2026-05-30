FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copia o wrapper e o pom primeiro para cache das dependências
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x ./mvnw

# Resolve dependências (opcional, melhora o cache)
RUN ./mvnw dependency:go-offline -B

# Copia o código-fonte e faz o build pulando testes
COPY src src
RUN ./mvnw clean package -DskipTests

# Estágio final apenas com JRE para rodar (imagem mais leve)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
