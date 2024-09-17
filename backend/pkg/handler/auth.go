package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) signUp(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "User signed up successfully",
	})
}

func (h *Handler) signIn(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "User signed up successfully",
	})
}
