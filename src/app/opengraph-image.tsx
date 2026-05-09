import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 45%, rgba(79,70,229,1) 100%)',
          color: 'white',
          padding: '72px',
        }}
      >
        <div
          style={{
            fontSize: 34,
            opacity: 0.8,
            marginBottom: 20,
          }}
        >
          idonnno
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          idonnno is a idonnno that idonnno idonnno
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
