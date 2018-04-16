export interface ToolbarConfigurationModel {
  toolbarTitle : string;
  backEnabled? : boolean;
  addEnabled? : boolean;
  backRoute? : string;
  addRoute? : string;
}

export interface ToolBarActionEvent {
  action : string;
}
