// error-handler.js
class ErrorHandler {
  constructor() {
    this.errors = [];
  }

  /**
   * Catch and log errors
   * @param {Error} error
   */
  catch(error) {
    this.errors.push(error);
    console.error(error);
    this.reportError(error);
  }

  /**
   * Report error to server or analytics tool
   * @param {Error} error
   */
  reportError(error) {
    // Send error to server or analytics tool using AJAX or fetch API
    fetch('/error-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        userAgent: navigator.userAgent,
        url: window.location.href
      })
    });
  }

  /**
   * Initialize error handler
   */
  init() {
    // Catch errors on window
    window.addEventListener('error', (event) => {
      this.catch(event.error);
    });

    // Catch errors on document
    document.addEventListener('error', (event) => {
      this.catch(event.error);
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.catch(event.reason);
    });
  }
}

const errorHandler = new ErrorHandler();
errorHandler.init();
