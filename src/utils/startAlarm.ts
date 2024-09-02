type StartAlarm = (audioContext: AudioContext | null) => void;

export const startAlarm: StartAlarm = (audioContext) => {
  if (audioContext) {
    const duration = 0.1; // 各ビープ音の長さ
    const gap = 0.1; // ビープ音の間隔を短く
    const frequency = 700; // 高めの音（880Hz）に設定

    for (let i = 0; i < 4; i++) {
      // オシレーターの作成
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // 波形の種類を設定（sine波でマイルドな音に）
      oscillator.type = "sine";

      // 周波数を設定（高めの音に変更）
      oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime + i * (duration + gap)
      );

      // ゲイン（音量）を設定
      gainNode.gain.setValueAtTime(
        0.8,
        audioContext.currentTime + i * (duration + gap)
      ); // 初期音量
      gainNode.gain.exponentialRampToValueAtTime(
        0.5,
        audioContext.currentTime + i * (duration + gap) + 0.01
      ); // 速いフェードイン
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + i * (duration + gap) + duration
      ); // 速いフェードアウト

      // オシレーターとゲインノードを接続
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // オシレーターの再生開始
      oscillator.start(audioContext.currentTime + i * (duration + gap));

      // オシレーターの停止
      oscillator.stop(
        audioContext.currentTime + i * (duration + gap) + duration
      );
    }
  }
};
