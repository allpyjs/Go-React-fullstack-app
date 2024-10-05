package structure

type Register struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Intent   string `json:"intent"`
	Msg      string `json:"msg"`
}

type IntentDefine struct {
	Intent string `json:"intent"`
	Msg    string `json:"msg"`
}
type TokenAcess struct {
	Intent string `json:"intent"`
	Colour string `json:"colour"`
	Email  string `json:"email"`
}
