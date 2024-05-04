FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Create a new user
ENV NEW_USER=user1
ENV NEW_USER_PASSWORD='pass1'

# Update database name
ENV POSTGRES_DB=nextdb

# Create the new user and databases
RUN echo "CREATE USER $NEW_USER WITH PASSWORD '$NEW_USER_PASSWORD';" > /docker-entrypoint-initdb.d/01_create_user.sql
RUN echo "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $NEW_USER;" > /docker-entrypoint-initdb.d/03_grant_privileges.sql

# SQL script to create the "items" table in the development database
RUN echo "\connect $POSTGRES_DB;" > /docker-entrypoint-initdb.d/04_create_table_dev.sql
RUN echo "CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, item TEXT);" >> /docker-entrypoint-initdb.d/04_create_table_dev.sql
RUN echo "ALTER TABLE items OWNER TO $NEW_USER;" >> /docker-entrypoint-initdb.d/04_create_table_dev.sql
RUN echo "GRANT ALL PRIVILEGES ON TABLE items TO $NEW_USER;" >> /docker-entrypoint-initdb.d/04_create_table_dev.sql

# Expose the default PostgreSQL port
EXPOSE 5432