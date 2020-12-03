package com.myvirtualspace.myvirtualspaceapplication.context.log;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.BadRequestException;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NoAuthorizationException;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("within(com.myvirtualspace.myvirtualspaceapplication.controllers..*) || within(com.myvirtualspace.myvirtualspaceapplication.repositories..*) || within(com.myvirtualspace.myvirtualspaceapplication.services..*)")
    public void loggingOperation() {
    }

    @Around("loggingOperation()")
    public Object logAroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

        log.trace("The method " + proceedingJoinPoint.getSignature() + " begins.");

        Object result = null;

        try {

            result = proceedingJoinPoint.proceed();

        } catch (BadRequestException | NotFoundException | NoAuthorizationException e) {
            throw e;
        } catch (Throwable e) {

            log.error("Exception occurred while executing method " + proceedingJoinPoint.getSignature());
            log.error("##############################    Exception.printStackTrace()    ##############################");
            log.error("Exception detail:", e);
            log.error("##############################  END Exception.printStackTrace()  ##############################");

            throw e;
        }

        log.trace("The method " + proceedingJoinPoint.getSignature() + " ends.");
        return result;

    }

}
