import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer, Text as KonvaText } from 'react-konva';
import useImage from 'use-image';
import styles from './DesignStudio.module.css';

const GARMENTS = {
  hoodie: { front: '/studio/base_hoodie_front.png', back: '/studio/base_hoodie_back.png' },
  shirt: { front: '/studio/base_shirt_front.png', back: '/studio/base_shirt_back.png' },
  tracksuit: { front: '/studio/base_tracksuit_front.png', back: '/studio/base_tracksuit_back.png' },
  teamuniform: { front: '/studio/base_teamuniform_front.png', back: '/studio/base_teamuniform_back.png' },
};

const PATCHES = [
  { id: 'tiger', src: '/studio/patch_tiger.png' },
  { id: 'vintage', src: '/studio/patch_vintage.png' },
];

const FONTS = ['sans-serif', 'serif', 'monospace', 'Impact', 'Comic Sans MS', 'Arial Black'];

// Component for rendering images with handles
const URLImage = ({ imageInfo, isSelected, onSelect, onChange }) => {
  const [img] = useImage(imageInfo.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        onClick={onSelect}
        onTap={onSelect}
        image={img}
        ref={shapeRef}
        {...imageInfo}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...imageInfo,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imageInfo,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorSize={25}
          anchorCornerRadius={12}
          padding={5}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

const EditableText = ({ textInfo, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaText
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...textInfo}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...textInfo,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...textInfo,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            fontSize: Math.max(5, node.fontSize() * Math.max(scaleX, scaleY)), 
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          anchorSize={25}
          anchorCornerRadius={12}
          padding={5}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default function DesignStudio() {
  const [garment, setGarment] = useState('hoodie');
  const [view, setView] = useState('front');
  const [color, setColor] = useState('#ffffff');
  
  const [layers, setLayers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  const [stageWidth, setStageWidth] = useState(500);
  const [stageScale, setStageScale] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        setStageWidth(width);
        setStageScale(width / 500);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const stageRef = useRef();
  const baseImgRef = useRef();
  const fileInputRef = useRef();

  // Deselect when clicking empty area
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Max size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        // scale down if too large
        let w = img.width;
        let h = img.height;
        if (w > 200) {
          h = (200 / w) * h;
          w = 200;
        }
        
        const newLayer = {
          id: `upload-${Date.now()}`,
          type: 'image',
          src: event.target.result,
          x: 100,
          y: 100,
          width: w,
          height: h,
        };
        setLayers([...layers, newLayer]);
      };
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const addPatch = (patchSrc) => {
    const newLayer = {
      id: `patch-${Date.now()}`,
      type: 'image',
      src: patchSrc,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
    };
    setLayers([...layers, newLayer]);
  };

  const addText = () => {
    const text = prompt("Enter text:", "CUSTOM TEXT");
    if (!text) return;
    const newLayer = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: text,
      x: 150,
      y: 150,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'sans-serif',
    };
    setLayers([...layers, newLayer]);
  };

  const updateLayer = (id, newProps) => {
    setLayers(layers.map((layer) => (layer.id === id ? newProps : layer)));
  };

  const removeLayer = (id) => {
    setLayers(layers.filter(l => l.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleRequestDesign = () => {
    // Deselect first to remove transformer
    setSelectedId(null);
    
    setTimeout(() => {
      // 1. Get Base Image & Color
      const baseCanvas = document.createElement('canvas');
      const ctx = baseCanvas.getContext('2d');
      const baseImg = baseImgRef.current;
      
      baseCanvas.width = 500;
      baseCanvas.height = 500;
      
      // Emulate object-fit: contain
      const imgRatio = baseImg.naturalWidth / baseImg.naturalHeight;
      const canvasRatio = 500 / 500;
      let renderWidth = 500;
      let renderHeight = 500;
      let offsetX = 0;
      let offsetY = 0;
      if (imgRatio > canvasRatio) {
         renderHeight = 500 / imgRatio;
         offsetY = (500 - renderHeight) / 2;
      } else {
         renderWidth = 500 * imgRatio;
         offsetX = (500 - renderWidth) / 2;
      }

      // Draw background color ONLY where the mask exists
      if (color !== '#ffffff') {
         // 1. Draw the transparent garment to create an alpha mask
         ctx.drawImage(baseImg, offsetX, offsetY, renderWidth, renderHeight);
         
         // 2. Fill with color only where the garment exists (source-in uses alpha of destination)
         ctx.globalCompositeOperation = 'source-in';
         ctx.fillStyle = color;
         ctx.fillRect(0, 0, 500, 500);
         
         // 3. Draw the transparent garment again to apply shadows (multiply)
         ctx.globalCompositeOperation = 'multiply';
         ctx.drawImage(baseImg, offsetX, offsetY, renderWidth, renderHeight);
      } else {
         ctx.drawImage(baseImg, offsetX, offsetY, renderWidth, renderHeight);
      }
      
      // Draw overlays (Konva Stage)
      ctx.globalCompositeOperation = 'source-over';
      const stageDataURL = stageRef.current.toDataURL({ pixelRatio: 1 });
      const overlayImg = new window.Image();
      overlayImg.src = stageDataURL;
      overlayImg.onload = () => {
        ctx.drawImage(overlayImg, 0, 0, 500, 500);
        const finalImage = baseCanvas.toDataURL('image/jpeg', 0.8);
        
        // Populate the form and scroll to it
        const formEl = document.querySelector('#quote-form');
        if (formEl) {
          const subjField = formEl.querySelector('select[name="subject"]');
          if (subjField) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
            setter.call(subjField, 'Custom Order');
            subjField.dispatchEvent(new Event('change', { bubbles: true }));
          }
          const msgField = formEl.querySelector('textarea[name="message"]');
          if (msgField) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
            setter.call(msgField, `Garment: ${garment} (${view} view)\nColor: ${color}\nLayers: ${layers.length}`);
            msgField.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
        
        console.log("Exported Image Data URL (can attach to form/email):", finalImage);
        alert("Design prepared! We've pre-filled the contact form. Please attach the design when we reply.");
        
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      };
    }, 100); 
  };

  return (
    <section id="design-studio" className={styles.studioSection}>
      <div className="container">
        <div className={styles.studioHeader}>
          <h2>Design Your Own</h2>
          <p>Customize a hoodie, shirt, or tracksuit with your artwork, patches, and text.</p>
        </div>

        <div className={styles.studioContainer}>
          {/* LEFT SIDEBAR: Controls */}
          <div className={styles.sidebar}>
            <h3>Garment</h3>
            <div className={styles.pillGroup}>
              {Object.keys(GARMENTS).map(g => (
                <button 
                  key={g} 
                  className={garment === g ? styles.activePill : styles.pill}
                  onClick={() => setGarment(g)}
                >
                  {g === 'teamuniform' ? 'Team Uniform' : g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>

            <h3>View</h3>
            <div className={styles.pillGroup}>
              <button 
                className={view === 'front' ? styles.activePill : styles.pill}
                onClick={() => setView('front')}
              >
                Front
              </button>
              <button 
                className={view === 'back' ? styles.activePill : styles.pill}
                onClick={() => setView('back')}
              >
                Back
              </button>
            </div>

            <h3>Base Color</h3>
            <div className={styles.colorSwatches}>
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className={styles.colorPicker}
                title="Choose custom color"
              />
              <span className={styles.colorHex}>{color.toUpperCase()}</span>
            </div>
          </div>

          {/* CENTER: Canvas */}
          <div className={styles.canvasArea}>
            <div className={styles.canvasWrapper} ref={wrapperRef} style={{ backgroundColor: 'transparent' }}>
              {/* Layer 1: Solid Color Masked to Silhouette */}
              <div 
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  backgroundColor: color,
                  WebkitMaskImage: `url(${GARMENTS[garment][view]})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskImage: `url(${GARMENTS[garment][view]})`,
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat'
                }} 
              />
              {/* Layer 2: Original grayscale image (transparent bg) multiplied over the color */}
              <img 
                ref={baseImgRef}
                src={GARMENTS[garment][view]} 
                alt={`${garment} ${view}`}
                className={styles.baseGarment}
                style={{ mixBlendMode: 'multiply', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                crossOrigin="anonymous"
              />
              <div className={styles.konvaContainer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
                <Stage 
                  width={stageWidth} 
                  height={stageWidth} 
                  scaleX={stageScale}
                  scaleY={stageScale}
                  onMouseDown={checkDeselect}
                  onTouchStart={checkDeselect}
                  ref={stageRef}
                >
                  <Layer>
                    {/* Bounding box guide for print area */}
                    <KonvaImage 
                      visible={false}
                    />
                    
                    {layers.map((layer) => {
                      if (layer.type === 'image') {
                        return (
                          <URLImage
                            key={layer.id}
                            imageInfo={layer}
                            isSelected={layer.id === selectedId}
                            onSelect={() => setSelectedId(layer.id)}
                            onChange={(newProps) => updateLayer(layer.id, newProps)}
                          />
                        );
                      }
                      if (layer.type === 'text') {
                        return (
                          <EditableText
                            key={layer.id}
                            textInfo={layer}
                            isSelected={layer.id === selectedId}
                            onSelect={() => setSelectedId(layer.id)}
                            onChange={(newProps) => updateLayer(layer.id, newProps)}
                          />
                        );
                      }
                      return null;
                    })}
                  </Layer>
                </Stage>
              </div>
            </div>
            <p className={styles.hintText}>Drag to move. Tap to select and resize.</p>
          </div>

          {/* RIGHT SIDEBAR: Layers & Additions */}
          <div className={styles.sidebar}>
            <h3>Add Design</h3>
            
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/svg+xml" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <button className={`btn-primary ${styles.actionBtn}`} onClick={() => fileInputRef.current.click()}>
              Upload Artwork
            </button>
            <button className={`btn-outline ${styles.actionBtn}`} onClick={addText}>
              Add Text
            </button>

            <div className={styles.patchLibraryWrapper}>
              <h3>Patch Library</h3>
              <div className={styles.patchGrid}>
                {PATCHES.map(patch => (
                  <div key={patch.id} className={styles.patchItem} onClick={() => addPatch(patch.src)}>
                    <img src={patch.src} alt="patch" />
                  </div>
                ))}
              </div>
            </div>

            {layers.length > 0 && (
              <>
                <h3>Layers</h3>
                <div className={styles.layersList}>
                  {layers.map(layer => (
                    <div key={layer.id} className={`${styles.layerItem} ${selectedId === layer.id ? styles.activeLayer : ''}`}>
                      <div className={styles.layerInfo} onClick={() => setSelectedId(layer.id)}>
                        <span>{layer.type === 'image' ? 'Image' : `Text: "${layer.text}"`}</span>
                        
                        {selectedId === layer.id && (
                          <div className={styles.sizeControls}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Size:</span>
                            <button 
                              className={styles.sizeBtn}
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                if(layer.type === 'image') {
                                  updateLayer(layer.id, { ...layer, width: Math.max(20, layer.width * 0.9), height: Math.max(20, layer.height * 0.9) });
                                } else {
                                  updateLayer(layer.id, { ...layer, fontSize: Math.max(10, layer.fontSize * 0.9) });
                                }
                              }}
                            >-</button>
                            <button 
                              className={styles.sizeBtn}
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                if(layer.type === 'image') {
                                  updateLayer(layer.id, { ...layer, width: layer.width * 1.1, height: layer.height * 1.1 });
                                } else {
                                  updateLayer(layer.id, { ...layer, fontSize: layer.fontSize * 1.1 });
                                }
                              }}
                            >+</button>
                          </div>
                        )}

                        {layer.type === 'text' && selectedId === layer.id && (
                          <select 
                            value={layer.fontFamily}
                            onChange={(e) => updateLayer(layer.id, { ...layer, fontFamily: e.target.value })}
                            className={styles.fontSelect}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                        )}
                      </div>
                      <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); removeLayer(layer.id); }}>×</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button className={`btn-primary ${styles.submitBtn}`} onClick={handleRequestDesign}>
              Request This Custom Design
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
