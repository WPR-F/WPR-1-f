#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["wprfAPI.csproj", "."]
RUN dotnet restore "./wprfAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "wprfAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "wprfAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5210
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "wprfAPI.dll"]