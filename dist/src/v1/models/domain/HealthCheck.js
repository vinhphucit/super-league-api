"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfo = exports.AppMetric = exports.MetricInfo = exports.HealthCheck = void 0;
class HealthCheck {
    constructor(metric) {
        this.status = 'Up';
        this.metric = metric;
    }
}
exports.HealthCheck = HealthCheck;
class MetricInfo {
    constructor(info, metric) {
        this.info = info;
        this.metric = metric;
    }
}
exports.MetricInfo = MetricInfo;
class AppMetric {
    constructor(memory, uptime, startupAt) {
        this.memory = memory;
        this.uptime = uptime;
        this.startupAt = startupAt;
    }
}
exports.AppMetric = AppMetric;
class AppInfo {
    constructor(name, version, host, port, env) {
        this.name = name;
        this.version = version;
        this.host = host;
        this.port = port;
        this.env = env;
    }
}
exports.AppInfo = AppInfo;
//# sourceMappingURL=HealthCheck.js.map