export default interface Component {
 /**
  * The ID of the component.
  */
 id: string;
 /**
  * The cooldown of the component's execution.
  */
 cooldown?: number | null;
 /**
  * The execution function.
  */
 execute: typeof function;
}
