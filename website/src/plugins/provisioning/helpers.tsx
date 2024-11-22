import React  from 'react';
import ReactMarkdown from 'react-markdown';

const MarkedDown = ({ label, content }) => {
  if (!content) {
    return null;
  }

  const toggleContent = event => {
    event.currentTarget.classList.toggle('selected')
    event.currentTarget.nextSibling.classList.toggle('hidden')
  };

  // @FIXME: this is quite a lazy assumption -- that the first line is the title
  const editedContent = content.split("\n").slice(1).join("\n")

  return (
    <>
      <tr className="marked-button" onClick={toggleContent}>
        <td>{label}</td>
        <td>
          <div className="status"></div>
        </td>
      </tr>
      <tr className="marked-content hidden">
        <td colSpan={2} >
          {/* @ts-ignore */}
          <div><ReactMarkdown>{ editedContent }</ReactMarkdown></div>
        </td>
      </tr>
    </>
  );
}

export const buildTable = data => {
    return Object.keys(data).map(version => {
      const allCapabilities = data[version];
      const { install, limitations, wazo_plugin: wazoPlugin, ...capabilities } = allCapabilities;

      return <table key={version} className="table">
        <thead>
          <tr>
            <th className="key">Firmware <br />
            Wazo Plugin</th>
            <th className="value">
              {version}<br />
              {wazoPlugin || <>&nbsp;</>}
            </th>
          </tr>
        </thead>
        <tbody>
          <MarkedDown label="Installation" content={install} />
          <MarkedDown label="Limitations" content={limitations} />
          {Object.keys(capabilities).map(key => {
            let value = capabilities[key];
            if (value === true) {
              value = 'yes';
            }
            if (value === false) {
              value = 'no';
            }
            return <tr key={`${version}-${key}`}>
              <td className="key">{key.replace('_', ' ')}</td>
              <td className="value">{value}</td>
            </tr>;
          })}
        </tbody>
      </table>;
    })
  }
