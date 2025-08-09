# Use the official .NET 6.0 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["IndiaPortalClone.csproj", "."]
RUN dotnet restore "IndiaPortalClone.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "IndiaPortalClone.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IndiaPortalClone.csproj" -c Release -o /app/publish

# Final stage - runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IndiaPortalClone.dll"]
