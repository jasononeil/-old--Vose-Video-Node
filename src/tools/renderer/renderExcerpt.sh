#! /bin/sh
  
if [ $# -ne 4  ]
then
    echo ''
    echo 'Usage: ./renderExcerpt "source.kdenlive" "output.vob" inPoint outPoint'
    echo ''
    exit
fi
  
LAUNCH="/usr/bin/kdenlive_render -kuiserver"
SECTION="in=$3 out=$4"
RENDER="/usr/bin/melt"
PROFILE="hdv_1080_50i"
RENDERMODULE="avformat"
PLAYER="-"
ARGS="f=dvd vcodec=mpeg2video acodec=ac3 b=5000k maxrate=8000k minrate=0 bufsize=1835008 mux_packet_s=2048 mux_rate=10080000 ab=192k ar=48000 s=720x576 g=15 me_range=63 trellis=1 mlt_profile=dv_pal_wide"
  
clear
  
$LAUNCH $SECTION $RENDER $PROFILE $RENDERMODULE $PLAYER "consumer:$1" "$2" $ARGS


