export interface ToastMsgModel {
  type : string;
  duration? : number;
  error_response? : string;
  fallback_message? : string;
  message? : string;
}

