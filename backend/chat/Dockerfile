FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY build/libs/chat-0.0.1-SNAPSHOT.jar chat.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/chat.jar"]
