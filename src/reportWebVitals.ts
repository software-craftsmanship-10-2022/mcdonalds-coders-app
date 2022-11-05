import type { ReportHandler } from 'web-vitals';

class ImportError extends Error {
  constructor(lib: string, error: string) {
      super(`error importing "${lib}" lib. Original error: ${error}`);
  }
}

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    try {
      const {getCLS, getFID, getFCP, getLCP, getTTFB} = await import('web-vitals');
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    } catch (error: unknown) {
      throw new ImportError('web-vitals', error as string);
    }
  }
};

export default reportWebVitals;
export {ImportError}
