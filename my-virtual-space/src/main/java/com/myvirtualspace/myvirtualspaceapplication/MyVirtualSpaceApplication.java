package com.myvirtualspace.myvirtualspaceapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EnableJpaRepositories("com.myvirtualspace.myvirtualspaceapplication.repositories")
@EntityScan("com.myvirtualspace.myvirtualspaceapplication.entities")
@EnableAspectJAutoProxy
@EnableScheduling
@EnableAsync
@SpringBootApplication
public class MyVirtualSpaceApplication {

    @PostConstruct
    public void init() {
        // Setting Spring Boot SetTimeZone
        TimeZone.setDefault(TimeZone.getTimeZone("GMT"));
    }

    public static void main(String[] args) {
        SpringApplication.run(MyVirtualSpaceApplication.class, args);
    }

}
