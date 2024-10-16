package handlers

import (
	"backend/database/models"
	"backend/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strings"
)

func GetProfile(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("userID")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
			return
		}

		var user models.User
		if err := db.First(&user, userID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"name":  user.Name,
			"email": user.Email,
			"image": user.Image, // Return image as Base64 string
		})
	}
}

// EditProfile allows users to update their name, email, and avatar.
func EditProfile(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract userID from the context (set by the AuthMiddleware).
		userID, exists := c.Get("userID")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
			return
		}

		var input struct {
			Name  string `json:"name"`
			Email string `json:"email"`
			Image string `json:"image"`
		}

		// Bind JSON input from the request body.
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Validate email if it was provided.
		if input.Email != "" && !utils.IsValidEmail(input.Email) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный Email"})
			return
		}

		// Validate Base64 image if provided.
		if input.Image != "" && !isValidBase64(input.Image) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный формат изображения"})
			return
		}

		// Find the user by ID.
		var user models.User
		if err := db.First(&user, userID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		// Update only the fields provided in the input.
		if input.Name != "" {
			user.Name = input.Name
		}
		if input.Email != "" {
			user.Email = input.Email
		}
		if input.Image != "" {
			user.Image = input.Image
		}

		// Save the updated user to the database.
		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Profile updated successfully",
			"user": gin.H{
				"name":  user.Name,
				"email": user.Email,
				"image": user.Image,
			},
		})
	}
}

// Helper function to validate Base64 format.
func isValidBase64(str string) bool {
	if strings.TrimSpace(str) == "" {
		return false
	}
	if _, err := utils.DecodeBase64(str); err != nil {
		return false
	}
	return true
}
