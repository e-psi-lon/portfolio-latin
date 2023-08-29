// SECRET_KEY est soit une variable d'environnement soit (si undefined) une chaîne de caractères aléatoire

const config = {
    SECRET_KEY: process.env.SECRET_KEY || "SecretKeyForDevelopment"
};

export default config;