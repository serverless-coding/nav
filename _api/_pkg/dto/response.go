package dto

type BaseRespose struct {
	Code    int    `json:"code,omitempty"`
	Message string `json:"message,omitempty"`
}


func Success()BaseRespose{
	return BaseRespose{
		Code: 200,
	}
}