# resource-monitor

## Usage

```
npm install
npm run build
npm run start
```

## Configuration

### Environmental Variables

`PORT`: port to use for socket subscription
`INTERVAL`: stat broadcast interval (seconds)

## Deploy from docker image

```
docker run -p 3000:3000 ruisiang/resource-monitor
```

## Client Example

```
npx ts-node client-example
```

## Monitor Payload

```JSON
{
  "cpuUtil":"0.0222",
  "memUtil":"8.9344",
  "uptime":"10449"
}
```

| Attribute | Type              | Description                     |
| --------- | ----------------- | ------------------------------- |
| cpuUtil   | float, 4 decimals | cpu utilization (percentage)    |
| memUtil   | float, 4 decimals | memory utilization (percentage) |
| uptime    | integer           | system uptime (seconds)         |
