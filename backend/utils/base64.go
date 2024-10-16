package utils

import (
	"encoding/base64"
	"errors"
)

// DecodeBase64 checks if the string is valid Base64 and returns the decoded data.
func DecodeBase64(data string) ([]byte, error) {
	decoded, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		return nil, errors.New("invalid Base64 string")
	}
	return decoded, nil
}

// EncodeBase64 encodes binary data to a Base64 string.
func EncodeBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}
