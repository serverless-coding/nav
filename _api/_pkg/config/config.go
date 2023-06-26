package config

import "os"

func ParseConfig() *Config {
	c := &Config{}

	c.DatabaseUrl = os.Getenv("DATABASE_URL")
	c.NextAuthUrl = os.Getenv("NEXTAUTH_URL")
	c.NextAuthSecret = os.Getenv("NEXTAUTH_SECRET")
	c.Github.ClientId = os.Getenv("GITHUB_CLIENT_ID")
	c.Github.Secret = os.Getenv("GITHUB_CLIENT_SECRET")
	c.Google.ClientId = os.Getenv("GOOGLE_CLIENT_ID")
	c.Google.Secret = os.Getenv("GOOGLE_CLIENT_SECRET")
	// os.Getenv("_CLIENT_ID")
	// os.Getenv("_CLIENT_SECRET")
	return c
}

type Config struct {
	DatabaseUrl    string      `json:"database_url,omitempty"`
	Google         OAuthConfig `json:"google,omitempty"`
	Github         OAuthConfig `json:"github,omitempty"`
	NextAuthUrl    string      `json:"next_auth_url,omitempty"`
	NextAuthSecret string      `json:"next_auth_secret,omitempty"`
}

type OAuthConfig struct {
	ClientId string `json:"client_id,omitempty"`
	Secret   string `json:"secret,omitempty"`
}
