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
  "cpuUtil":"0.02",
  "memUtil":"8.93",
  "uptime":"10449"
}
```

| Attribute | Type              | Description                     |
| --------- | ----------------- | ------------------------------- |
| cpuUtil   | float, 2 decimals | cpu utilization (percentage)    |
| memUtil   | float, 2 decimals | memory utilization (percentage) |
| uptime    | integer           | system uptime (seconds)         |
