import { Response } from 'express';

export enum HttpStatus {
	OK = 200, // OK: Standard response for successful HTTP requests.
	CREATED = 201, // Created: The request has been fulfilled, resulting in the creation of a new resource.
	EMPTY = 204, // No Content: The server successfully processed the request and is not returning any content.
	BAD_REQUEST = 400, // Bad Request: The server cannot or will not process the request due to an apparent client error.
	NOT_FOUND = 404, // Not Found: The requested resource could not be found but may be available in the future.
	UNAUTHORIZED = 401, // Unauthorized: The request has not been applied because it lacks valid authentication credentials for the target resource.
	FORBIDDEN = 403, // Forbidden: The server understood the request but refuses to authorize it.
	CONFLICT = 409, // Conflict: Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.
	INTERNAL_SERVER_ERROR = 500, // Internal Server Error: A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
}

class HttpResponses {
	OK(res: Response, message: string, data: any) {
		return res.status(HttpStatus.OK).json(data);
	}

	Created(res: Response, message: string, data: any) {
		return res.status(HttpStatus.CREATED).json(data);
	}

	Empty(res: Response, message: string) {
		return res.status(HttpStatus.EMPTY).json();
	}

	BadRequest(res: Response, message: string) {
		return res.status(HttpStatus.BAD_REQUEST).json({
			success: false,
			message,
			data: null
		});
	}

	NotFound(res: Response, message: string) {
		return res.status(HttpStatus.NOT_FOUND).json({
			success: false,
			message,
			data: null
		});
	}

	Unauthorized(res: Response, message: string) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			success: false,
			message,
			data: null
		});
	}

	Forbidden(res: Response, message: string) {
		return res.status(HttpStatus.FORBIDDEN).json({
			success: false,
			message,
			data: null
		});
	}

	Conflict(res: Response, message: string) {
		return res.status(HttpStatus.CONFLICT).json({
			success: false,
			message,
			data: null
		});
	}

	InternalServerError(res: Response, message: string) {
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message,
			data: null
		});
	}
}

export const httpResponses = new HttpResponses();