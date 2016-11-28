export default function getTestConfig() {
  return {
    region: 'us-west-2',
    endpoint: process.env.ENDPOINT,
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
}