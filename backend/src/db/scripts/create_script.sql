CREATE TABLE IF NOT EXISTS "Customers"
(
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "Customers_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "Drivers"
(
    id SERIAL NOT NULL,
    name VARCHAR(255),
    description VARCHAR(255),
    car VARCHAR(255),
    rating VARCHAR(255),
    tax DECIMAL,
    minimum_km INT,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "Drivers_pkey" PRIMARY KEY (id),
    CONSTRAINT "Drivers_name_key" UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS "Rides"
(
    id SERIAL NOT NULL,
    driver_id INT,
    customer_id VARCHAR(255),
    origin VARCHAR(255),
    destination VARCHAR(255),
    distance DECIMAL,
    duration VARCHAR(255),
    value DECIMAL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "Rides_pkey" PRIMARY KEY (id),
    CONSTRAINT "Rides_customer_id_fkey" FOREIGN KEY (customer_id)
        REFERENCES "Customers" (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Rides_driver_id_fkey" FOREIGN KEY (driver_id)
        REFERENCES "Drivers" (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);