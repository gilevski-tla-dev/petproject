package handlers

import (
	"backend/database/models"
	"backend/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

func ValidateToken(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получаем токен из запроса (например, из заголовка Authorization)
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Токен не предоставлен"})
			return
		}

		// Валидируем токен и получаем email
		email, err := utils.ValidateJWT(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Невалидный токен"})
			return
		}

		// Ищем пользователя по email
		var user models.User
		if err := db.Where("email = ?", email).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Пользователь не найден"})
			return
		}

		// Возвращаем ID пользователя
		c.JSON(http.StatusOK, gin.H{
			"id": user.ID,
		})
	}
}
