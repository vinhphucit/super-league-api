export class HealthCheck {
    public status: string = 'Up';
    public metric: MetricInfo;

    constructor();
    constructor(metric: MetricInfo)
    constructor(metric?: MetricInfo) {
        this.metric = metric;
    }
}

export class MetricInfo {
    public info: AppInfo;
    public metric: AppMetric;

    constructor(info: AppInfo, metric: AppMetric) {
        this.info = info;
        this.metric = metric;
    }
}

export class AppMetric {
    public memory: any;
    public uptime: string;
    public startupAt: Date

    constructor(memory: any, uptime: string, startupAt: Date) {
        this.memory = memory;
        this.uptime = uptime;
        this.startupAt = startupAt;
    }
}

export class AppInfo {
    public name: string;
    public version: string;
    public host: string;
    public port: string;
    public env: string

    constructor(name: string, version: string, host: string, port: string, env: string) {
        this.name = name;
        this.version = version;
        this.host = host;
        this.port = port;
        this.env = env;

    }
}













