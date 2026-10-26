window.addEventListener('load', function () {
  SwaggerUIBundle({
    url: '../openapi/weather-demo.yaml',
    dom_id: '#swagger-ui',
    deepLinking: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: -1,
    supportedSubmitMethods: ['get'],
    presets: [SwaggerUIBundle.presets.apis],
    layout: 'BaseLayout'
  });
});
