create table fitness_db.address
(
    id           int auto_increment
        primary key,
    postal_code  varchar(10)  null,
    city         varchar(100) null,
    street       varchar(100) null,
    house_number varchar(10)  null,
    floor        int          null,
    door         int          null
);

create table fitness_db.provider
(
    id            int auto_increment
        primary key,
    name          varchar(100) null,
    type          varchar(50)  null,
    contact_email varchar(100) null,
    phone_number  varchar(20)  null,
    address_id    int          null,
    constraint fk_address_id
        foreign key (address_id) references fitness_db.address (id)
);

create table fitness_db.subscription
(
    id          int auto_increment
        primary key,
    name        varchar(100)   null,
    price       decimal(10, 2) null,
    description text           null,
    provider_id int            null,
    period text null,
    constraint subscription_ibfk_1
        foreign key (provider_id) references fitness_db.provider (id)
);

create index provider_id
    on fitness_db.subscription (provider_id);

create table fitness_db.users
(
    id         int auto_increment
        primary key,
    first_name varchar(50)  null,
    last_name  varchar(50)  null,
    username   varchar(50)  null,
    password   varchar(100) null,
    birth_date date         null,
    address_id int          null,
    constraint username
        unique (username),
    constraint users_ibfk_1
        foreign key (address_id) references fitness_db.address (id)
);

create table fitness_db.classes
(
    id            int auto_increment
        primary key,
    class_name    varchar(100) not null,
    provider_id   int          null,
    instructor_id int          null,
    location_id   int          null,
    class_limit   int          null,
    constraint classes_ibfk_1
        foreign key (provider_id) references fitness_db.provider (id),
    constraint classes_ibfk_2
        foreign key (instructor_id) references fitness_db.users (id),
    constraint classes_ibfk_3
        foreign key (location_id) references fitness_db.address (id)
);

create index instructor_id
    on fitness_db.classes (instructor_id);

create index location_id
    on fitness_db.classes (location_id);

create index provider_id
    on fitness_db.classes (provider_id);

create table fitness_db.timeslots
(
    id         int auto_increment
        primary key,
    class_id   int      null,
    start_time datetime null,
    end_time   datetime null,
    capacity   int      null,
    constraint timeslots_ibfk_1
        foreign key (class_id) references fitness_db.classes (id)
);

create table fitness_db.reservations
(
    id          int auto_increment
        primary key,
    user_id     int null,
    timeslot_id int null,
    constraint reservations_ibfk_1
        foreign key (user_id) references fitness_db.users (id),
    constraint reservations_ibfk_2
        foreign key (timeslot_id) references fitness_db.timeslots (id)
);

create index timeslot_id
    on fitness_db.reservations (timeslot_id);

create index user_id
    on fitness_db.reservations (user_id);

create index class_id
    on fitness_db.timeslots (class_id);

create table fitness_db.user_subscription
(
    id              int auto_increment
        primary key,
    user_id         int  null,
    subscription_id int  null,
    start_date      date null,
    end_date        date null,
    constraint user_subscription_ibfk_1
        foreign key (user_id) references fitness_db.users (id),
    constraint user_subscription_ibfk_2
        foreign key (subscription_id) references fitness_db.subscription (id)
);

create index subscription_id
    on fitness_db.user_subscription (subscription_id);

create index user_id
    on fitness_db.user_subscription (user_id);

create index address_id
    on fitness_db.users (address_id);

