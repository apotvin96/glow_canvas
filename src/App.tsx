import { useEffect, useState } from "react";
import "./App.css";
import { config } from "./config";
import { getPresets, getSystemState } from "./api";
import Preset from "./types/preset";
import { Tooltip } from "antd";

const App: React.FC<any> = () => {
    const [systemState, setSystemState] = useState<any | null>(null);
    const [presets, setPresets] = useState<Preset[]>([]);

    useEffect(() => {
        getSystemState().then((state: any | null) => {
            setSystemState(state);
        });

        getPresets().then((presets: any[] | null) => {
            console.log("presets", presets);

            if (presets) {
                const newPresets = [];

                for (const [index, preset] of Object.entries<any>(presets)) {
                    preset.id = parseInt(index);

                    newPresets.push(new Preset(preset));
                }

                setPresets(newPresets);
            } else {
                setPresets([]);
            }
        });
    }, []);

    const renderPresets = (): React.ReactNode => {
        if (!presets) {
            return <div>Loading presets...</div>;
        }

        const presetItems = [];

        for (const [index, preset] of Object.entries<any>(presets)) {
            presetItems.push(<div key={index}>{preset.n}</div>);
        }

        return presetItems;
    };

    const renderPresetBox = (presetId: number): React.ReactNode => {
        const preset = presets.find((preset) => preset.id === presetId);

        if (!preset) {
            return <></>;
        }

        return (
            <Tooltip
                title={<div>{JSON.stringify(preset)}</div>}
                overlayClassName="w-96"
            >
                <div className="p-2 rounded-md shadow-md w-48 bg-brand">
                    <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                        Name: {preset.n}
                    </div>
                    <div>On: {preset.on ? "true" : "false"}</div>
                    <div>Brightness: {preset.bri}</div>
                </div>
            </Tooltip>
        );
    };

    const renderCurrentPlaylist = (playlist: any): React.ReactNode => {
        return (
            <div className="flex flex-wrap gap-2">
                {playlist.ps.map((preset: any) => renderPresetBox(preset))}
            </div>
        );
    };

    const renderCurrentPreset = (): React.ReactNode => {
        if (!systemState || !presets) {
            return <div>Loading...</div>;
        }

        const currentPreset = presets.find(
            (preset) => preset.id === systemState.pl
        );

        if (!currentPreset) {
            return <div>Invalid Current Preset</div>;
        }

        return (
            <div>
                <div>{currentPreset.n}</div>
                <div>
                    {currentPreset.playlist &&
                        renderCurrentPlaylist(currentPreset.playlist)}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-[100vh] max-h-[100vh] bg-gray p-12 overflow-clip">
            <div className="flex items-end gap-2">
                <div className="text-5xl font-oswald font-semibold text-white">
                    LED DEVICE
                </div>
                <div className="text-2xl font-roboto-mono text-brand">
                    {config.DEVICE_URL}
                </div>
            </div>

            <div className="flex-1 flex w-full">
                <div className="w-60">
                    <div className="lex flex-col">{renderPresets()}</div>
                </div>

                <div className="flex-1 shadow-lg p-2">
                    {
                        systemState && presets && renderCurrentPreset()
                        // <div>{JSON.stringify(presets[systemState.pl])}</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;
