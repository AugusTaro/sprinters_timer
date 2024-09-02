type StartMutedAlarm = (audioContext: AudioContext | null) => void;

export const startMutedAlarm: StartMutedAlarm = (audioContext) => {
  if (audioContext) {
    // オシレーターの作成
    const oscillator = audioContext.createOscillator();

    // 波形の種類を設定（'sine', 'square', 'sawtooth', 'triangle'など）
    oscillator.type = "sine"; // 正弦波

    // 周波数を設定（無音でもオシレーターの周波数は設定が必要）
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440Hz

    // ゲインノードを作成し、音量をゼロに設定
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // 無音に設定

    // オシレーターをゲインノードに接続し、ゲインノードをオーディオコンテキストの出力先に接続
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // オシレーターの再生開始
    oscillator.start();

    // 0.1秒後に停止
    oscillator.stop(audioContext.currentTime + 0.1);
  }
};
