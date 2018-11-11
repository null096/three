import React, { Component } from 'react';
import * as THREE from 'three';

class App extends Component {
  mount = React.createRef();

  componentDidMount() {
    const width = this.mount.current.clientWidth;
    const height = this.mount.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#b8b');
    renderer.setSize(width, height);
    this.mount.current.appendChild(renderer.domElement);

    /*  const geometry = new THREE.BoxGeometry(5, 4, 3);
     const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
     const cube = new THREE.Mesh(geometry, material);
     scene.add(cube); */

    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(13, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, -10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, -100));
    geometry.vertices.push(new THREE.Vector3(15, -11, 0));
    geometry.vertices.push(new THREE.Vector3(13, 0, 0));
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    camera.position.z = 70;

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.line = line;
    // this.cube = cube;
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
    /*     this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.01; */

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
