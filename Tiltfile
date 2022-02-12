version_settings(constraint='>=0.24.0')

docker_compose('docker-compose-dev.yml')

dc_resource('users', labels=["backend"])
dc_resource('reservations', labels=["backend"])
dc_resource('availability', labels=["backend"])
dc_resource('books', labels=["backend"])
dc_resource('redis', labels=["services"])
dc_resource('db', labels=["services"])
