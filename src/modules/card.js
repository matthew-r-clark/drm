import ReactDOM from 'react-dom';
import Card from 'components/Card';

export default function createCard(content) {
  const rootNode = document.getElementById('modal-root') || document.createElement('div');
  rootNode.setAttribute('id', 'modal-root');
  const { body } = document;
  body.appendChild(rootNode);

  const handleClose = () => {
    if (body.contains(rootNode)) {
      body.removeChild(rootNode);
    }
  };

  document.activeElement.blur();
  ReactDOM.render(
    <Card content={content} handleClose={handleClose} />,
    rootNode,
  );

  return handleClose;
}
