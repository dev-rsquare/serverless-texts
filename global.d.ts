interface Env {
    PATH: string;
    LANG: string;
    LD_LIBRARY_PATH: string;
    LAMBDA_TASK_ROOT: string;
    LAMBDA_RUNTIME_DIR: string;
    AWS_REGION: string;
    AWS_DEFAULT_REGION: string;
    AWS_LAMBDA_LOG_GROUP_NAME: string;
    AWS_LAMBDA_LOG_STREAM_NAME: string;
    AWS_LAMBDA_FUNCTION_NAME: string;
    AWS_LAMBDA_FUNCTION_MEMORY_SIZE: string;
    AWS_LAMBDA_FUNCTION_VERSION: string;
    _AWS_XRAY_DAEMON_ADDRESS: string;
    _AWS_XRAY_DAEMON_PORT: string;
    AWS_XRAY_DAEMON_ADDRESS: string;
    AWS_XRAY_CONTEXT_MISSING: string;
    _X_AMZN_TRACE_ID: string;
    AWS_EXECUTION_ENV: string;
    NODE_PATH: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SESSION_TOKEN: string;
}

interface TextEnv extends Env {
    LANGUAGE: string;
    DDB_LOG_TABLE: string;
    DDB_TABLE: string;
    FX_PREFIX: string;
    S3_BUCKET: string;
    JWT_SECRET: string;
}

declare namespace NodeJS {
    interface Process {
        env: TextEnv;
    }
}
