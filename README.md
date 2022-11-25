# CRM

Run containers:

```
docker compose --project-directory . -f etc/docker/docker-compose.dev.yml up -d
```

Stop containers:

```
docker compose --project-directory . -f etc/docker/docker-compose.dev.yml stop
```

Remove containers:

```
docker compose --project-directory . -f etc/docker/docker-compose.dev.yml down
```

## Migrations

Apply migrations:

```
docker exec -it crm_backend_dev bash
alembic upgrade head
exit
```
