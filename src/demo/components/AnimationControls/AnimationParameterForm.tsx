import { Download, Play, RotateCcw, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { AnimationType, baseParameterConfigs, orbitalParameterConfigs, springParameterConfigs, wobbleParameterConfigs } from '../../../lib/animation/types';
import { useAnimationParameters } from '../../context/AnimationContext';
import './AnimationControls.css';
import { ParameterGroup } from './ParameterGroup';
import { ParameterSlider } from './ParameterSlider';

interface AnimationParameterFormProps {
  animationType: AnimationType;
  onAnimationTypeChange?: (animationType: AnimationType) => void;
  onReplay?: () => void;
}

export function AnimationParameterForm({ animationType, onAnimationTypeChange, onReplay }: AnimationParameterFormProps) {
  const {
    getParameters,
    updateParameter,
    updateSpringParameter,
    updateWobbleParameter,
    updateOrbitalParameter,
    resetToDefaults,
  } = useAnimationParameters();

  const fileInputRef = useRef<HTMLInputElement>(null);

    const parameters = getParameters(animationType);
    
    const isSpringAnimation = ['spring-physics', 'silk-unfold', 'orbital-reveal', 'elastic-bounce'].includes(animationType);
    // Crystal Shimmer uses keyframe arrays for scale, so it responds to wobble intensity.
    const isWobbleAnimation = ['elastic-bounce', 'scale-rotate', 'crystal-shimmer'].includes(animationType);
    const isOrbitalAnimation = animationType === 'orbital-reveal';
    
    const isNoneAnimation = animationType === 'none';
  const handleReset = () => {
    resetToDefaults(animationType);
    toast.success('Parameters reset to defaults');
  };

  const handleExport = async () => {
    const currentParams = getParameters(animationType);
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      animationType: animationType,
      parameters: currentParams
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const suggestedName = `animation-parameters-${animationType}-${Date.now()}.json`;

    try {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = suggestedName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      toast.success(`Parameters exported to "${suggestedName}"!`);
    } catch (error) {
      console.error('[Export] Fallback download failed:', error);
      toast.error('Error exporting file');
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importData = JSON.parse(content);

        if (!importData.animationType || !importData.parameters) {
          toast.error('Invalid file format');
          return;
        }

        const targetAnimationType = importData.animationType as AnimationType;

        if (targetAnimationType !== animationType) {
          if (onAnimationTypeChange) {
             onAnimationTypeChange(targetAnimationType);
          } else {
             toast.error(`Imported file is for "${targetAnimationType}" but currently on "${animationType}"`);
             return;
          }
        }

        const params = importData.parameters;

        if (params.durationScale !== undefined) updateParameter(targetAnimationType, 'durationScale', params.durationScale);
        if (params.delayOffset !== undefined) updateParameter(targetAnimationType, 'delayOffset', params.delayOffset);
        if (params.staggerChildren !== undefined) updateParameter(targetAnimationType, 'staggerChildren', params.staggerChildren);
        if (params.delayChildren !== undefined) updateParameter(targetAnimationType, 'delayChildren', params.delayChildren);

        if (params.spring) {
          if (params.spring.stiffness !== undefined) updateSpringParameter(targetAnimationType, 'stiffness', params.spring.stiffness);
          if (params.spring.damping !== undefined) updateSpringParameter(targetAnimationType, 'damping', params.spring.damping);
          if (params.spring.mass !== undefined) updateSpringParameter(targetAnimationType, 'mass', params.spring.mass);
        }

        if (params.wobble?.wobbleIntensity !== undefined) {
          updateWobbleParameter(targetAnimationType, 'wobbleIntensity', params.wobble.wobbleIntensity);
        }

        if (params.orbital?.orbitDistance !== undefined) {
          updateOrbitalParameter(targetAnimationType, 'orbitDistance', params.orbital.orbitDistance);
        }

        toast.success(`Parameters imported for "${targetAnimationType}"!`);
      } catch (error) {
        toast.error('Error importing file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (isNoneAnimation) {
    return (
      <div className="animation-parameter-form">

        <p className="animation-parameter-form__empty">
          No parameters available for "No Animation" mode.
        </p>
      </div>
    );
  }

  return (
    <div className="animation-parameter-form">
      <div className="animation-parameter-form__header">

        <div className="animation-parameter-form__actions">
          <button className="animation-parameter-form__action-button" onClick={onReplay} title="Replay Animation">
             <Play size={16} fill="currentColor" />
          </button>
          <button className="animation-parameter-form__action-button" onClick={handleExport} title="Export">
            <Download size={16} />
          </button>
          <button className="animation-parameter-form__action-button" onClick={handleImport} title="Import">
            <Upload size={16} />
          </button>
          <button className="animation-parameter-form__action-button" onClick={handleReset} title="Reset">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <ParameterGroup title="Timing">
        <ParameterSlider
          label={baseParameterConfigs[0].label}
          value={parameters.durationScale}
          min={baseParameterConfigs[0].min}
          max={baseParameterConfigs[0].max}
          step={baseParameterConfigs[0].step}
          description={baseParameterConfigs[0].description}
          onChange={(value) => updateParameter(animationType, 'durationScale', value)}
        />
        <ParameterSlider
          label={baseParameterConfigs[1].label}
          value={parameters.delayOffset}
          min={baseParameterConfigs[1].min}
          max={baseParameterConfigs[1].max}
          step={baseParameterConfigs[1].step}
          description={baseParameterConfigs[1].description}
          onChange={(value) => updateParameter(animationType, 'delayOffset', value)}
        />
      </ParameterGroup>

      <ParameterGroup title="Stagger Effect">
        <ParameterSlider
          label={baseParameterConfigs[2].label}
          value={parameters.staggerChildren}
          min={baseParameterConfigs[2].min}
          max={baseParameterConfigs[2].max}
          step={baseParameterConfigs[2].step}
          description={baseParameterConfigs[2].description}
          onChange={(value) => updateParameter(animationType, 'staggerChildren', value)}
        />
        <ParameterSlider
          label={baseParameterConfigs[3].label}
          value={parameters.delayChildren}
          min={baseParameterConfigs[3].min}
          max={baseParameterConfigs[3].max}
          step={baseParameterConfigs[3].step}
          description={baseParameterConfigs[3].description}
          onChange={(value) => updateParameter(animationType, 'delayChildren', value)}
        />
      </ParameterGroup>

      {isSpringAnimation && parameters.spring && (
        <ParameterGroup title="Spring Physics">
          <ParameterSlider
            label={springParameterConfigs[0].label}
            value={parameters.spring.stiffness}
            min={springParameterConfigs[0].min}
            max={springParameterConfigs[0].max}
            step={springParameterConfigs[0].step}
            description={springParameterConfigs[0].description}
            onChange={(value) => updateSpringParameter(animationType, 'stiffness', value)}
          />
          <ParameterSlider
            label={springParameterConfigs[1].label}
            value={parameters.spring.damping}
            min={springParameterConfigs[1].min}
            max={springParameterConfigs[1].max}
            step={springParameterConfigs[1].step}
            description={springParameterConfigs[1].description}
            onChange={(value) => updateSpringParameter(animationType, 'damping', value)}
          />
          <ParameterSlider
            label={springParameterConfigs[2].label}
            value={parameters.spring.mass}
            min={springParameterConfigs[2].min}
            max={springParameterConfigs[2].max}
            step={springParameterConfigs[2].step}
            description={springParameterConfigs[2].description}
            onChange={(value) => updateSpringParameter(animationType, 'mass', value)}
          />
        </ParameterGroup>
      )}

      {isWobbleAnimation && parameters.wobble && (
        <ParameterGroup title="Wobble Effect">
          <ParameterSlider
            label={wobbleParameterConfigs[0].label}
            value={parameters.wobble.wobbleIntensity}
            min={wobbleParameterConfigs[0].min}
            max={wobbleParameterConfigs[0].max}
            step={wobbleParameterConfigs[0].step}
            description={wobbleParameterConfigs[0].description}
            onChange={(value) => updateWobbleParameter(animationType, 'wobbleIntensity', value)}
          />
        </ParameterGroup>
      )}

      {isOrbitalAnimation && parameters.orbital && (
        <ParameterGroup title="Orbital Motion">
          <ParameterSlider
            label={orbitalParameterConfigs[0].label}
            value={parameters.orbital.orbitDistance}
            min={orbitalParameterConfigs[0].min}
            max={orbitalParameterConfigs[0].max}
            step={orbitalParameterConfigs[0].step}
            description={orbitalParameterConfigs[0].description}
            onChange={(value) => updateOrbitalParameter(animationType, 'orbitDistance', value)}
          />
        </ParameterGroup>
      )}
    </div>
  );
}
