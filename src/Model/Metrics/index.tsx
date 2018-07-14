import * as React from 'react';
import styles from './styles.scss';
import Info, {
  IDatum,
} from './Info';
import {
  IImageData,
} from 'utils/getFilesAsImages';
import Logs from './Logs';

interface IProps {
  images?: IImageData[];
  downloading: boolean;
  onDownload?: Function;
  logs: {
    [index: string]: any;
  };
  accuracy: IDatum[];
}

interface IData {
  label: string;
}

const getData = (images: IData[] = []) => {
  const numOfImages = images.reduce((obj, image) => ({
    ...obj,
    [image.label]: (obj[image.label] || 0) + 1,
  }), {});

  return Object.keys(numOfImages).map((label) => {
    return {
      label,
      data: numOfImages[label],
    };
  });
};

class Metrics extends React.Component<IProps> {
  render() {
    const {
      images,
      onDownload,
      downloading,
      accuracy,
      logs,
    } = this.props;

    return (
      <div className={styles.container}>
        <Info
          title="Data"
          data={getData(images)}
        />
        <Info
          title="Accuracy"
          data={accuracy}
        />
        <div className={styles.footer}>
          <Logs logs={logs} />
          {onDownload && (
            <button
              disabled={downloading}
              onClick={() => onDownload()}
            >
              Download
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Metrics;

export { IMetricsInfoProps, IDatum } from './Info';
