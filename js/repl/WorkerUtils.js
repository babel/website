// @flow

type Handler = (message: any) => any;
type WorkerEventData = {
  error: ?string,
  message: ?any,
  uid: string,
};
type WorkerEvent = {
  data: WorkerEventData,
};

export function registerPromiseWorker(handler: Handler) {
  self.addEventListener("message", function(event) {
    const { data } = event;

    try {
      const message = handler(data.message);

      self.postMessage({
        message,
        uid: data.uid,
      });
    } catch (error) {
      self.postMessage({
        error: error.message,
        uid: data.uid,
      });
    }
  });
}

export function registerPromiseWorkerApi(worker: any) {
  const uidMap = {};

  // Unique id per message since message order isn't guaranteed
  let counter = 0;

  worker.addEventListener("message", (event: WorkerEvent) => {
    const { uid, error, message } = event.data;
    const [resolve, reject] = uidMap[uid];

    delete uidMap[uid];

    if (error == null) {
      resolve(message);
    } else {
      reject(error);
    }
  });

  return {
    postMessage(message: any) {
      const uid = ++counter;

      return new Promise<any>((resolve, reject) => {
        uidMap[uid] = [resolve, reject];
        worker.postMessage({
          message,
          uid,
        });
      });
    },
  };
}
