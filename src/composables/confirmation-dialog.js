export function useConfirmation(dialog, message) {
  return new Promise((resolve, reject) => {
    dialog({
      title: "Confirm",
      message: message ? message : "Are you sure?",
      cancel: true,
      persistent: false,
    })
      .onOk(() => {
        resolve(true);
        // console.log(">>>> OK");
      })
      // .onOk(() => {
      //   console.log(">>>> second OK catcher");
      // })
      .onCancel(() => {
        resolve(false);
        // reject();
      });
    // .onDismiss(() => {
    //   console.log("I am triggered on both OK and Cancel");
    // });
  });
}
