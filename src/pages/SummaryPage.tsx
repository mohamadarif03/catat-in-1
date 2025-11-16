// src/pages/SummaryPage.tsx
import React from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Ikon-ikon untuk tombol aksi
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

// --- DATA DUMMY (HANYA UNTUK TAMPILAN) ---
const dummyData = {
  title: 'Mitochondria_Review.pdf',
  summary: `Mitochondria, sering disebut sebagai "pabrik energi" sel, adalah organel yang menghasilkan sebagian besar pasokan sel adenosin trifosfat (ATP), yang digunakan sebagai sumber energi kimia.

Mereka memiliki dua membran, membran luar yang halus dan membran dalam yang sangat berbelit-belit yang membentuk lipatan (krista). Lipatan ini meningkatkan luas permukaan untuk reaksi kimia respirasi seluler.

Selain produksi energi, mitokondria terlibat dalam berbagai proses seluler lainnya, termasuk pensinyalan seluler, diferensiasi seluler, dan pertumbuhan sel, serta siklus sel dan apoptosis (kematian sel terprogram).`,
};
// --- AKHIR DATA DUMMY ---


function SummaryPage(): React.JSX.Element {
  const navigate = useNavigate();

  // Fungsi pura-pura untuk copy
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dummyData.summary);
    // (Nanti bisa tambahkan notifikasi "Copied!")
    alert("Teks rangkuman disalin ke clipboard!");
  };

  return (
    <Box>
      {/* Tombol Kembali */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
        sx={{ mb: 2, textTransform: 'none' }}
      >
        Back to Library
      </Button>

      <Typography variant="h4" gutterBottom>
        AI Summary
      </Typography>

      {/* Sumber Dokumen */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: 'action.hover', // Latar belakang abu-abu muda
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Summary from:
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {dummyData.title}
        </Typography>
      </Paper>

      {/* Kotak Rangkuman */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line', // Ini penting agar format paragraf (newline) tetap ada
            lineHeight: 1.7,
          }}
        >
          {dummyData.summary}
        </Typography>
      </Paper>

      {/* Tombol Aksi */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Next Steps
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          color="secondary" // Oranye
          startIcon={<QuizOutlinedIcon />}
          sx={{ textTransform: 'none' }}
        >
          Generate Quiz from this Summary
        </Button>
        <Button
          variant="outlined"
          startIcon={<SaveAltOutlinedIcon />}
          sx={{ textTransform: 'none' }}
        >
          Save to My Library
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyOutlinedIcon />}
          onClick={handleCopyToClipboard}
          sx={{ textTransform: 'none' }}
        >
          Copy Summary
        </Button>
      </Stack>
    </Box>
  );
}

export default SummaryPage;