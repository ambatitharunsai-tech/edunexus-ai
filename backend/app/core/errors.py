"""
EduNexus AI — Global Error Handlers
Transforms all standard exceptions and validation failures into structured ErrorResponse objects.
"""

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.schemas.errors import ErrorDetail, ErrorResponse


def setup_exception_handlers(app: FastAPI) -> None:
    """Register custom exception handlers for uniform API error envelopes."""

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        code_map = {
            400: "BAD_REQUEST",
            401: "UNAUTHORIZED",
            403: "FORBIDDEN",
            404: "NOT_FOUND",
            405: "METHOD_NOT_ALLOWED",
            409: "CONFLICT",
            422: "UNPROCESSABLE_ENTITY",
            500: "INTERNAL_SERVER_ERROR",
        }
        error_code = code_map.get(exc.status_code, f"HTTP_{exc.status_code}")
        payload = ErrorResponse(
            error=ErrorDetail(
                code=error_code,
                message=str(exc.detail) if exc.detail else "An HTTP error occurred",
            )
        )
        return JSONResponse(status_code=exc.status_code, content=payload.model_dump(), headers=exc.headers)

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ):
        formatted_errors = []
        for err in exc.errors():
            loc = " -> ".join(str(item) for item in err.get("loc", []))
            formatted_errors.append(
                {
                    "location": loc,
                    "field": err.get("loc", [])[-1] if err.get("loc") else "body",
                    "issue": err.get("msg", "Validation error"),
                    "type": err.get("type", "value_error"),
                }
            )

        payload = ErrorResponse(
            error=ErrorDetail(
                code="VALIDATION_ERROR",
                message="Request validation failed. Please inspect input parameters.",
                details=formatted_errors,
            )
        )
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=payload.model_dump(),
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        payload = ErrorResponse(
            error=ErrorDetail(
                code="INTERNAL_SERVER_ERROR",
                message="An unexpected server error occurred. Please contact support.",
                details=None,
            )
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=payload.model_dump(),
        )
