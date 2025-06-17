import { NextFunction } from "express";
import { FailedRequestBodyError, InternalServerError, NotFoundError } from "../src/utils/errors";

export function ErrorHandlingMiddlewareFunction(err :any, req :any, res : any, next: any) {	
	  console.log(JSON.stringify(err));
	
	  if ( err  instanceof FailedRequestBodyError){
		  return res.status(400).json(err.response());
	  }
	  if( err instanceof  InternalServerError){
		  return res.status(500).json(err.response());
	  }
	  if( err instanceof  NotFoundError){
		return res.status(404).json(err.response());
	}
	
	  res.status(500).send('Server Error');
	  
	
	}


