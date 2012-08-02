using Detox;

class Renderer 
{
    static function main()
    {
        var args = neko.Sys.args();
        if (args.length < 1) throw "Please pass filename of kdenlive project as first argument";
        var filename = args.shift();
        new Renderer(filename);
    }

    var xml:dtx.DOMCollection;

    function new(filename:String)
    {
        var str = neko.io.File.getContent(filename);
        xml = str.parse();
        var parts = getSegmentsToExport();

        for (part in parts)
        {
            neko.Lib.println(Std.format("~/Scripts/kdenlive/renderExcerpt.sh '$filename' '03 Exports/${part.segment}.vob' ${part.startPoint} ${part.endPoint}"));
        }
    }

    // Given the project Xml, find the track by the given name
    function findTrackByName(name:String)
    {
        // Search for child <kdenlivedoc> (should be last child, should only be one of them)
        // This is the data that isn't important to rendering, but is to the project - tracknames, project imports etc.
        // Search for child <tracksinfo> (should only be one of them)
        var trackInfoList = xml.find('kdenlivedoc tracksinfo');

        // Get list of children <trackinfo> (should be about 6 of them in our template)
        // These correspond to the tracks in our kdenlive project.  The first element is the bottom track,
        // The second element is the second from the bottom, the final element is the top track etc.
        var index = 0;
        for (trackinfo in trackInfoList.children())
        {
            // Get the one who has the attribute trackname="$name"
            // Get it's index.  (First child=0, second child=1, third=2 etc)
            if (trackinfo.attr('trackname') == name) break;
            index++;
        }

        // Go back to the MLT object, and select all the <playlist> elements, then get our one by the index.
        // In the MLT tracks, a "black_track" is added, so our MLT-index will be one higher
        var mltPlaylists = xml.find('playlist');
        var ourplaylist = mltPlaylists.getNode(index + 1);


        // Return this playlist.
        return ourplaylist;
    }

    function getSegmentsToExport()
    {
        var playlist = findTrackByName("Break / Discussion");

        var partsToExport = new Array<ExportDefinition>();

        var currentFrame = 0; // Should this be 1?  Will have to test
        var currentSegment = 1;

        for (child in playlist)
        {
            switch (child.tagName())
            {
                case "entry":
                    // If it's <entry>, then there's something in this track, so we do not export this segment.
                    // get the duration, based on the in and out points, inclusive (+1)
                    var duration = Std.parseInt(child.attr("out")) - Std.parseInt(child.attr("in")) + 1;
                    currentFrame = currentFrame + duration;
                case "blank":
                    // If it's <blank>, then there's nothing in this track, so we do export this segment
                    
                    var startPoint = currentFrame;
                    var duration = Std.parseInt(child.attr("length"));
                    currentFrame = currentFrame + duration;
                    var endPoint = currentFrame;
                    // print "Export Part%s.vob from %s to %s" % (currentSegment, startPoint, endPoint)
                    //trace ("~/Scripts/kdenlive/renderExcerpt.sh '02 Kdenlive/Lectures.kdenlive' '03 Exports/Part%s.vob' %s %s") % (currentSegment, startPoint, endPoint)

                    partsToExport.push({
                        segment: "Part" + currentSegment,
                        startPoint: startPoint,
                        endPoint: endPoint
                    });

                    currentSegment++;

            }
        }

        return partsToExport;
    }
}

typedef ExportDefinition = {
    segment:String,
    startPoint:Int,
    endPoint:Int
}