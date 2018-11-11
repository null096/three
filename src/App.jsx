import React, { Component } from 'react';
import * as THREE from 'three';

class App extends Component {
  mount = React.createRef();

  componentDidMount() {
    const width = this.mount.current.clientWidth;
    const height = this.mount.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
    const cube = new THREE.Mesh(geometry, material);

    camera.position.z = 4;
    scene.add(cube);
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;

    this.mount.current.appendChild(this.renderer.domElement);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.current.removeChild(this.renderer.domElement);
  }

  start = () => {
    this.frameId = requestAnimationFrame(this.animate);
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.start()}>Start</button>
        <button onClick={() => this.stop()}>Stop</button>
        <div
          style={{ width: '300px', height: '300px' }}
          ref={this.mount}
        />
      </React.Fragment>
    );
  }
}

export default App;
