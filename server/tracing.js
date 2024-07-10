// tracing.js
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'foodme-otelemetry',
  }),
});

const exporter = new OTLPTraceExporter({
  // Specify the URL of your OpenTelemetry collector
  url: 'https://otlp.nr-data.net:4317',
  headers: {
    'Api-Key': process.env.NEW_RELIC_LICENSE_KEY
  }
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();